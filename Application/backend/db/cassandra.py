from cassandra.cluster import Cluster
import config

_cluster = None


def get_session():
    """
    Returns a Cassandra session, reusing a single cluster connection
    instead of opening a brand new cluster object on every request.
    """
    global _cluster
    if _cluster is None:
        _cluster = Cluster([config.CASSANDRA_HOST], port=config.CASSANDRA_PORT)
    return _cluster.connect(config.CASSANDRA_KEYSPACE)
