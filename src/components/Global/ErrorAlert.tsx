import { IonAlert, IonLoading } from "@ionic/react";
import { useState } from "react";

interface ContainerProps {
    error: string | undefined
}

const ErrorAlert: React.FC<ContainerProps> = ({ error }) => {
    const [showAlert, setShowAlert] = useState(false);

  if (error) {
    setShowAlert(true);
  }

  return (
    <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Error Alert"
        subHeader="An error occurred"
        message={error ? error : ""}
        buttons={["OK"]}
      />
  )
      
}

export default ErrorAlert;