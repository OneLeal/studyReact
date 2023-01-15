import React from "react";
import { useParams } from "react-router-dom";

type ParamsKeys = {
  travelId: string;
  title: string;
};

export const TravelDetails: React.FC = () => {
  const params = useParams<ParamsKeys>();
  return <div>{`旅游详情页面, id:${params.travelId}`}</div>;
};
