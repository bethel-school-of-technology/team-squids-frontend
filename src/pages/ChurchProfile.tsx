import React from "react";
import { useParams } from "react-router-dom";
import { useFetchChurch } from "../hooks/useFetchChurch";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import ChurchInfo from "../components/Churches/ChurchInfo";
import ErrorAlert from "../components/Global/ErrorAlert";
import "./ChurchProfile.css";

interface ChurchRouteParams {
  churchId: string;
}

const ChurchProfile: React.FC = () => {
  const params = useParams<ChurchRouteParams>();
  const { church, loadingStatus, error } = useFetchChurch(
    parseInt(params.churchId)
  );

  return (
    <>
      <ErrorAlert error={error} />
      <LoadingSpinner status={loadingStatus} />
      {church && <ChurchInfo data={church} />}
    </>
  );
};

export default ChurchProfile;
