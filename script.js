import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

const DROPLET_ID = process.env.DROPLET_ID;
const API_TOKEN = process.env.API_TOKEN;
const INTERVAL = process.env.INTERVAL;
const MAX_SNAPSHOTS = process.env.MAX_SNAPSHOTS;

(async () => {
  const uri = "https://api.digitalocean.com/v2";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const getSnapshots = async () => {
    const response = await axios.get(
      `${uri}/droplets/${DROPLET_ID}/snapshots`,
      config
    );

    return response?.data?.snapshots;
  };

  const createSnapshot = async () => {
    const name = moment().utc().format("YYYY-MM-DD HH:mm");
    const response = await axios.post(
      `${uri}/droplets/${DROPLET_ID}/actions`,
      { type: "snapshot", name: name },
      config
    );

    console.log(`Created snapshot ${name}.`);

    return response?.data;
  };

  const deleteSnapshot = async snapshotId => {
    const response = await axios.delete(`${uri}/images/${snapshotId}`, config);

    console.log(`Deleted snapshot ${snapshotId}.`);

    return response?.data;
  };

  const snapshots = await getSnapshots();

  if (snapshots?.length) {
    const now = moment().utc();
    const firstSnapshot = snapshots[0];
    const lastSnapshot = snapshots[snapshots.length - 1];

    const diff = Math.abs(moment(lastSnapshot.created_at).diff(now, "minutes"));

    if (diff >= INTERVAL) {
      createSnapshot();
    }

    if (snapshots.length > MAX_SNAPSHOTS) {
      deleteSnapshot(firstSnapshot.id);
    }
  }
})();
