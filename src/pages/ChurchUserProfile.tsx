import React, { useContext, useEffect } from "react";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import ErrorAlert from "../components/Global/ErrorAlert";
import { ChurchUserContext } from "../context/churchUserContext";
import { useFetchChurchUser } from "../hooks/useFetchChurchUser";
import ChurchUserInfo from "../components/ChurchUsers/ChurchUserInfo";

const ChurchUserProfile: React.FC = () => {
  const { currentUserId } = useContext(ChurchUserContext);
  const { churchUser, loadingStatus, error } =
    useFetchChurchUser(currentUserId);

    

  return (
    <>
      <ErrorAlert error={error} />
      {!currentUserId && !churchUser && (
        <LoadingSpinner status={loadingStatus} />
      )}
      {churchUser && <ChurchUserInfo data={churchUser} />}
    </>
  );
};

export default ChurchUserProfile;
