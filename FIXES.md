# Fix Log

This document maps every issue raised in the code review to the change that addresses it.
Cross-check against your own copy before merging - especially the secrets/credentials section, since real values must be supplied by you (none are included here).

## Critical

| Issue | Fix |
|---|---|
| Private SSH key committed and recoverable from git history | Removed from the working tree. **You still need to**: rotate/revoke this key (assume compromised), then rewrite history with `git filter-repo --path github_wsl_ubuntu --invert-paths` (and the `.pub`), then force-push. Also remove the matching public key from any `~/.ssh/authorized_keys` it was added to. |
| `/login` accepted any password and never validated credentials | `routes/auth.py` now looks up the user in MySQL and verifies the password with `bcrypt.checkpw`, returns 401 on mismatch, includes a JWT `exp` claim, and uses the same response for "no such user" and "wrong password" so the endpoint can't enumerate usernames. |
| Hardcoded DB credentials (`admin`/`admin123`) in `db/mysql.py` | Now reads from `config.py`, which reads from environment variables / the Kubernetes Secret. No credentials in source. |
| `routes/courses.py` had a `return` outside a function (real `SyntaxError`) - the whole app failed to import | Rewritten with the error-handling block correctly inside `get_courses()`. Verified with `compile()` - no syntax errors anywhere in the backend (see `tests/`). |
| `Application/frontend/Dockerfile` never built the React app | Rewritten as a proper multi-stage build: `node:20-alpine` runs `npm ci && npm run build`, then the static `build/` output is copied into `nginx:1.27-alpine`. |

## High

| Issue | Fix |
|---|---|
| No `.dockerignore`, `.env` and other junk got baked into images | Added `.dockerignore` to backend, frontend, and traffic-generator. |
| Containers ran as root | Backend and traffic-generator Dockerfiles create and switch to an unprivileged `appuser`. Helm `securityContext` added (`allowPrivilegeEscalation: false`, capabilities dropped). Frontend/nginx documented as to why it can't drop to non-root at the container level (port 80 bind) while still dropping all capabilities except `NET_BIND_SERVICE`. |
| Security groups open to `0.0.0.0/0` for SSH/Jenkins/NodePort | New `admin_cidr_blocks` variable (no default - must be set explicitly in `terraform.tfvars`) restricts SSH, Jenkins (8080), and the NodePort range. |
| IAM: Jenkins had `ecr:*` on `Resource: "*"` | Scoped to push/pull actions only, against the three specific repo ARNs (now exported from the `ecr` module and threaded into `iam`). |
| K8s nodes in the public subnet | Left as-is structurally (changing this requires a load balancer / bastion redesign, which is a bigger architectural change than a fix-in-place) - flagged again here as a follow-up item, not silently fixed. See "Not fixed" below. |
| MySQL role disabled GPG verification and skipped all hardening | Re-enabled GPG key import, added root password hardening, anonymous user removal, test DB removal, and a least-privilege application DB user - all driven by `ansible-vault`-sourced variables (see `roles/mysql/defaults/main.yaml`), nothing hardcoded. |
| No Terraform remote state | Added `Terraform/environments/dev/backend.tf` with a documented (commented-out, since it needs a bucket/table you create once) S3 + DynamoDB backend. |
| `debug=True` in Flask | Now driven by `FLASK_DEBUG` env var, defaults to `false`. |
| `CORS(app)` allowed any origin | Restricted to `ALLOWED_ORIGINS` from env, no wildcard default. |

## Medium

| Issue | Fix |
|---|---|
| `attendance.py` hardcoded `student_id=101`, `status='Present'` | Now reads both from the request body, validates them, and requires a valid JWT (`@require_auth`). |
| Raw exception text returned to API clients | All routes now log the real exception server-side (`current_app.logger.exception(...)`) and return a generic message to the caller. |
| `requirements.txt` had no version pins | Pinned every dependency to a specific version. |
| Jenkinsfile didn't match the documented pipeline (no test/smoke stages, placeholder account ID, wrong repo URL, wrong-case Helm path) | Rewritten: real `Unit Tests` stage (parallel frontend/backend), real `Smoke Tests` stage (rollout status + an in-cluster curl against `/health`), `AWS_ACCOUNT_ID` sourced from a Jenkins credential instead of a placeholder string, correct repo URL, lowercase `helm/` path, secrets injected via `withCredentials` instead of being in `values.yaml`. |
| Empty `jenkins/scripts/*.sh` placeholder files | Removed - the Jenkinsfile is the single source of truth for pipeline steps now, no dead files implying otherwise. |
| `Ansible/site.yaml` only ran 6 of ~17 playbooks | Now runs all of them, in dependency order (common → k8s bootstrap → ingress → supporting infra → observability). |
| Helm `image.tag: latest` + `pullPolicy: Always` against an `IMMUTABLE`-tag ECR repo | `tag` now has no default and is `required` in the template - you must pass an explicit build tag (e.g. `--set image.tag=$BUILD_NUMBER`), which is what the fixed Jenkinsfile does. |
| No `securityContext` / anti-affinity in Helm deployments | Added pod anti-affinity (spread replicas across nodes) and container `securityContext` to both frontend and backend charts. |

## Low / polish

| Issue | Fix |
|---|---|
| Empty test files everywhere implying coverage that didn't exist | Replaced with real, minimal tests: backend `pytest` tests for `/health`, `/live`, `/ready`, and `/login` validation; one frontend RTL test for the `Login` form. Wired into the Jenkinsfile's `Unit Tests` stage. |
| Inconsistent naming ("Indian University" vs "Gurram University") | `app.py`'s root route and the Jenkinsfile's repo URL now consistently say "Indian University Platform" / `ravishekharg/Indian-University`. |
| No `.env.example` | Added `Application/backend/.env.example` with placeholder (non-functional) values and comments. |
| `.gitignore` had gaps (`tfplan` still got committed) | Expanded to explicitly cover `*.tfplan`/`tfplan`, private key file patterns (`*.pem`, `id_rsa*`, `id_ed25519*`), and `.env*` except `.env.example`. |
| Frontend `App.js` imported capitalized filenames that didn't exist on disk (works on case-insensitive filesystems, breaks on Linux/CI) | Renamed `components/`/`pages/` files to match the imports exactly. Also wired up the previously-orphaned `Login` page with a `/login` route, and added an axios interceptor so the JWT is actually sent on subsequent requests. |
| `public/index.html` wasn't a valid HTML document (no `<div id="root">`) | Replaced with a standard CRA-style HTML5 document. |
| `package.json` used `react-scripts` in `scripts` without declaring it as a dependency | Added `react-scripts` (and the testing-library packages used by the new test) to `package.json`. |

## Not fixed (architectural, flagged for your decision)

- **K8s nodes in the public subnet.** Moving master/workers to the private subnet behind a load balancer or bastion is the right long-term fix, but it changes how you reach the cluster for `kubectl`/SSH and how the ingress controller gets exposed (you'd want an AWS NLB/ALB target group instead of direct NodePort access). I didn't want to silently restructure your network topology without you weighing in - happy to do this as a follow-up if you want it.
- **Single NAT gateway / single AZ for compute.** Fine for a dev/demo environment; call it out explicitly if you ever target production HA.
- **Vault/External Secrets integration.** I wired Helm and Ansible to expect secrets injected from outside (Jenkins credentials / ansible-vault), but didn't stand up an actual AWS Secrets Manager + External Secrets Operator integration - that's a real infrastructure addition, not a code fix, and needs an AWS account to test against.

## Frontend redesign (added after the initial review)

The original frontend had no real homepage, no logo, and an empty/unloaded stylesheet. This was new work, not a "fix" - there was nothing broken to repair, just nothing built yet:

- **Logo/crest**: `components/Logo.js` - an inline SVG seal mark ("IU" monogram), used in the navbar, the login screen (as a watermark), and as the site favicon (`public/favicon.svg`). No external image asset to manage.
- **Design system**: `styles/app.css` rewritten as a full token-based system (parchment/navy/brass palette, a serif+sans+mono type scale) - and actually wired up via `import "./styles/app.css"` in `index.js`, which it never was before (the file existed but was orphaned and empty).
- **Real homepage**: `Dashboard.js` now shows a greeting, three live stat cards (students, courses, present-today), and a module quick-link grid - with real loading/error/empty states instead of silently rendering blank.
- **Navigation**: `Sidebar.js` highlights the active route; `Navbar.js` shows the signed-in username and a sign-out control once authenticated.
- **Auth-aware routing**: `App.js` now redirects unauthenticated visitors to `/login` instead of rendering broken, data-less pages. `useAuth.js` reads (but does not trust) the JWT payload client-side purely for display - the backend still independently verifies every request.
- **Fixed real bugs found along the way**:
  - `Students.js` was rendering `student.name` / `student.course`, fields the API never returns (`first_name`/`last_name`/`email` are the real ones) - would have rendered blank cells.
  - `Courses.js` was a hardcoded static list, never calling the real `/courses` endpoint at all.
  - `Attendance.js` called `GET /attendance`, but the backend only ever exposed `POST /attendance` - every page load would 405. Added a proper `GET /attendance/summary` endpoint and pointed the frontend at it (see `routes/attendance.py` - note the `ALLOW FILTERING` caveat documented inline, since Cassandra's schema here isn't indexed for cross-partition aggregation; fine for this dataset's scale, not how you'd do it at real volume).
  - `Reports.js`'s buttons did nothing with no feedback - now they say plainly that report generation isn't wired to a backend yet, rather than failing silently.
  - Remaining "Gurram University" branding (Helm ingress hosts) updated to match "Indian University Platform" everywhere.

**Not done** (flagged, not silently skipped): no real browser screenshot of the result exists, since this sandbox has no internet access to `npm install` the project's actual dependencies (`react-router-dom`, `axios`, `@mui/material`) or run a real build - only syntax/JSX-level checks were possible here (all files parse cleanly). Run `npm install && npm start` locally to see it rendered for real.

## You still need to supply (none of these are in this zip)

- A rotated SSH key pair (after revoking the leaked one).
- Real values for: `MYSQL_USER`, `MYSQL_PASSWORD`, `JWT_SECRET`, `ALLOWED_ORIGINS` (backend `.env` or k8s Secret).
- Real values for: `mysql_root_password`, `mysql_app_user`, `mysql_app_password` (Ansible vault).
- A real `admin_cidr_blocks` value in `terraform.tfvars` (replace the placeholder `203.0.113.0/24`).
- Your actual AWS account ID, wired into Jenkins as the `aws-account-id` credential.
- At least one row in the existing `users` table (`Application/mysql/data.sql` or a seed script) with a real `bcrypt`-hashed password - `schema.sql` already defines `users(id, username, password_hash, role, created_at)`, which is exactly what the fixed `/login` queries, so no schema change was needed.
