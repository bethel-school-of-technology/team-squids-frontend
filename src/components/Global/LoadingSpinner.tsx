import { IonLoading } from "@ionic/react";

interface ContainerProps {
  data: boolean;
}

const LoadingSpinner: React.FC<ContainerProps> = ({ data }) => (
  <IonLoading isOpen={data} />
);

export default LoadingSpinner;
