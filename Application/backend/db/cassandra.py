from cassandra.cluster import Cluster

def get_session():

    cluster = Cluster([
        "cassandra-server"
    ])

    return cluster.connect("university")