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
    `https://lh3.googleusercontent.com/eauVwLHgmEcRfgM8eD2h6rzFcalTEk8y4UyXIYL2_qa84Ub6xWtLN5SLWQClCLg6LnZjOfyCySapwvyHv26wtkgFNKWyU_uHP-d3Cll8dJPkV3lpjVqCHsYZcQzDpB3BaYXBF1-Nvug3JShnYY9MY2WsuElaVGn9IOc9WPDeEUhyYQf-tX0xb1p_URw2FZHrc3OcxJBMxqhGBRUE9p4m7i7X6bjqpbB7jEMq4P98aa07XTJ2bOMUiKKDQ5ugakYQgLCmuxRmKUgkGMjao35PbidsFsKatWFFyUXZP1M60WuZO3ffmkL6q3pBViM4Gg5hIsl1bcsY4VTidnymGlO5fuTvBnte9bv7kRPhhVndJiWQGwzJGmlsNt-s8Z6NjzNGfJMTejeACXnxgX37FrrIoLO8PwJNZohi6k0pfFWfNN8-Ir-o5uhqA3HyPxF73X17XpJNia6-SC--BdScATgf4dEtwNdwMi0XHhT8pO-aiDa9nF7RuAl82eELuw_jaikYGOhubuZU_Cui0MbhlFDBytOHzMB7Rwu6oPGPoeLXC51GsFcL9Xu6PqefxeGRREvltrEQ9kiHxTGmqi27yH6386CMk8M6-sR8JrHStEt7C6dH6KaD_xaWcMJ_pY4AnVWSgQ5ocqRoVv3Zl7JdrzLNOLRqRXBdLLGaGcQTkaiMbemkxXZCbqUrUB8NjlamoSOplTyuNL1G9qdv3wwX5_x-vt1w_yjAHOGnOHQwi0DQ2F2fb-WDNFq5BtPYApM0EPBTPawRZmSW0gNqpMPof9Z0UnxNSq78AbG-nhsBWG6dSi-Etu_SRHDLUp0dxXw5Ip2JThHMs_sSys6pYnC-gFRUcxPdEvMtdvgfQVM-p7yAzi3fVkr6C9CkG3NzFvUAGCPKchBLoUZjacPpLIL5VLpd74HCiQOzExV7LyeBprvLHNA6Sw7f6Q=w32-h32-s-no?authuser=0`
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
          <p className={styles.link}>{website}</p>
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
