import { IonLoading } from "@ionic/react";

interface ContainerProps {
  status: boolean;
}

const LoadingSpinner: React.FC<ContainerProps> = ({ status }) => (
  <IonLoading isOpen={status} />
);

export default LoadingSpinner;
