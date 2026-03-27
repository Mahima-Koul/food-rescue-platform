import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function NgoMap() {

  // ✅ ALL HOOKS INSIDE COMPONENT
  const [userLocation, setUserLocation] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      const snapshot = await getDocs(collection(db, "donations"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setDonations(data);
    };

    fetchDonations();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={
          userLocation
            ? [userLocation.lat, userLocation.lng]
            : [12.9716, 77.5946]
        }
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {donations.map((d) => {
          if (!d.location) return null;

          return (
            <Marker key={d.id} position={[d.location.lat, d.location.lng]}>
              <Popup>
                <h3>{d.foodName}</h3>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default NgoMap;