Docker Django MySQL Demo
========================

A very simplistic demo of composing MySQL and Django containers.

# Docker Setup

	# Run docker-compose. Optional use (-d) argument to run as daemon
    $ docker-compose up
    # Create Database
    $ docker-compose exec db mysql -u root -p -e 'CREATE DATABASE `ddm` DEFAULT CHARACTER SET = `utf8mb4`'
    # Restore MySQL Dump (Asks for password, default is root as exposed in docker-compose.yml)	
    # If running not in daemon mode, open another terminal for running this
    $ docker-compose exec db sh /sql/restore.sh

Finally Browse to [http://localhost:9000](http://localhost:9000)

# Backup Database

	$ docker-compose exec db sh /sql/restore.sh

# Restore Database

	$ docker-compose exec db sh /sql/backup.sh



# Default MySQL User
	root root

# Default Users for Django
	root root
	admin adminadmin
	user useruser