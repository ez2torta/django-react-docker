Docker Django MySQL Demo
========================

A very simplistic demo of composing MySQL and Django containers.

# Docker Initial Setup

	
	## First we will poblate the database
	# Run docker-compose to run mysql. Optional use (-d) argument to run as daemon
    $ docker-compose up db

    # Create Database
    $ docker-compose exec db mysql -u root -p -e 'CREATE DATABASE `ddm` DEFAULT CHARACTER SET = `utf8mb4`'

    # Restore MySQL Dump (Asks for password, default is root as exposed in docker-compose.yml)	
    # If running not in daemon mode, open another terminal for running this
    $ docker-compose exec db sh /sql/restore.sh

    ## Copy environment files for React Dev Build
    $ cd react
    $ cp .env.example .env

    # After all of this, run the rest of the application
    $ docker-compose up app react

Finally Browse to [http://localhost:3000](http://localhost:3000)

# Backup Database

	$ docker-compose exec db sh /sql/restore.sh

# Restore Database

	$ docker-compose exec db sh /sql/backup.sh

# Django Administrator
	[http://localhost:9000/myadmin](http://localhost:9000/myadmin)

# Default MySQL User
	root root

# Default Users for Django
	root root
	admin adminadmin
	user useruser