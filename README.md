###### Requirement
* You will need valid DigitalOcean Token
* You will need valid DigitalOcean Droplet ID

###### Usage
* Copy .env.example file to .env and edit the DROPLET_ID, API_TOKEN, INTERVAL and MAX SNAPSHOTS variables with their digital ocean droplet Id, api token, interval in minutes and the maximum number of active snapshots, respectively.
* Run docker-compose up -d --build

###### Inspiration:
https://github.com/ishan3350/DigitalOceanSnapshotHourlyAutomation
