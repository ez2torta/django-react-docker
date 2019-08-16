Docker Django MySQL Demo
========================

A very simplistic demo of composing MySQL and Django containers.

# Docker Setup

	# Run docker-compose. Optional use (-d) argument to run as daemon
    $ docker-compose up
    # Restore MySQL Dump (Asks for password, default is root as exposed in docker-compose.yml)	
    $ docker-compose exec db sh /sql/backup.sh

# Backup Database

	$ docker-compose exec db sh /sql/restore.sh

# Restore Database

	$ docker-compose exec db sh /sql/backup.sh

Browse to [http://localhost:9000](http://localhost:9000)


admin
cocacola1
