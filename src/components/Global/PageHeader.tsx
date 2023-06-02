import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface ContainerProps {
  header: string;
}

const PageHeader: React.FC<ContainerProps> = ({ header }) => (
  <IonHeader>
    <IonToolbar color="secondary">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/" />
      </IonButtons>
      <IonTitle>{header}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default PageHeader;
