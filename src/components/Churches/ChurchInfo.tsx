import React from "react";
import { IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { OneChurch } from "../../context/churchContext";
import styles from "../../theme/info.module.css";

interface ChurchInfoProps {
  data: OneChurch;
}

const ChurchInfo: React.FC<ChurchInfoProps> = ({
  data: {
    churchName,
    denomination,
    location: { street, city, state, zip },
    phoneNumber,
    churchEmail,
    welcomeMessage,
    serviceTime,
    imageUrl,
    website,
  },
}) => {
  const apiKey = "AIzaSyBzMxAntTwImXe9Du0J042nG09954Ww980";

  const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${street},${city},${state}
  &markers=anchor:center%7Cicon:${encodeURIComponent(
    `https://lh3.googleusercontent.com/DWErpgEmMBfKO5hT4gVCSKB5R_kEurmpJbNkkfe8lefMv8vD-RmjQkZKvVch3G7lwM-PF4Yj2pqq8Wcdi5c-DHHweHHJqnZvF_2k39EuJv5Jf9ZgbBsc-M0ELoRfhVj5HVy_g6f7u-QlYU5UvxKtFT6j2qt_XDV4njH7e74h7QZFL5w7WNDM-iQdMLFIMgwic8EaLlX2cDNEt1SImqc7qZ6gF0Cm4pJrlfZdP1qOaMPmR5j1FZJG3ohXv2Bd5N6GLU9Uv5aZv4mLEYmFFBNqusnFYp6CnPl_jn4Sse4BY2H-1tCAVqH2XlcM4JSSHLJdQp500fT0PeEWZeVhrzL-M_5R4hWlOtcQMKFokuTJXPKrWfo8kRzeprC110sficm5TgWEo4sIz--Of5e32Ocp4a0UWfAqdNzN_PKEwrvXwyStxlBGaaFU-Wn42RYKgLuwY5-DPxm5g5JSnGFDbMR8cQuoHBvVB9tvwWZ-i7b9lU8SrTOWEzjSEoBU_oiKhid9KLEpGP9w_S0ErDoWAQLYTDNw9g7AOGxXO9-_9awE_U9eD7ug4sMtjisCXn3sp7jazDKuXiGkXT7PbWM2zJfkvwLqyNKaW0GTH-9o5mPBD1EmUqYTZKnxnlmEatFrejQFVp-xaOhUTEIR-O5FuueJuuHji7QjYNLMSMtzgguWNw6_aBX2s2W1z4ZOEZMpWyxJN6Aefu8D-KIe64UbsSwQ0fE4KAbzFxXBoWGi-4ybstaXHz6y-ZUNTHCF-uzudqWwOLMmmE2ZawUGk3Vgqs68XBr4KXbKZ9ngAgcGcI0iSInh0YZKrCm84Hx64DYLH9xMOykqc5KKl-PyeV5L5UpWi2R0rl-3aSU0X-r0N8R4Xc-6kvUqZ9ZMaNK8XI-yzB8q2BkPymDKCbvWRpXRwQAs-Rd1jjYKcjDi3-UxRRJHh9qnDg=w64-h64-s-no?authuser=0`
  )}|${encodeURIComponent(`${street},${city},${state}`)}
    &zoom=13&size=400x300&key=${apiKey}`;

  return (
    <IonRow className={styles.light}>
      <IonCol size="12">
        <IonImg className={styles.heroImg} src={imageUrl} alt={churchName} />
      </IonCol>
      <IonCol size="12">
        <h1 className={styles.title}>{churchName}</h1>
        <IonText color="secondary">
          <h6>{denomination}</h6>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Service Times</h4>
          <p>{serviceTime}</p>
      </IonCol>
      <IonCol size="12">
        <h4>Location</h4>
          <p>
            {street} <br />
            {city}, {state} {zip}
          </p>
      </IonCol>
      <IonCol>
        <IonImg src={staticMap} alt="staticMap">
          {" "}
        </IonImg>
      </IonCol>
      <IonCol size="12">
        <h4>Contact Information</h4>
        <a href={`https://${website}`}>
          <p className={styles.link}>{churchEmail}</p>
        </a>

          <p>{phoneNumber}</p>
      </IonCol>
      <IonCol size="12">
        <h4>Welcome to {churchName}</h4>
          <p>{welcomeMessage}</p>
      </IonCol>
    </IonRow>
  );
};

export default ChurchInfo;
