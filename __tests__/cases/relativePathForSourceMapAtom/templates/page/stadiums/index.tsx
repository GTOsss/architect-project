import React from 'react';
import { NextPage } from 'next';
import { serialize } from 'effector';
import { commonGSSP } from '@utils/ssr/commonGSSP';
import Stadiums from '@components/pages/stadiums';

export const getServerSideProps = () => {
  const { props, scope } = commonGSSP();

  return {
    props: { ...props, store: serialize(scope, { onlyChanges: true }) },
  };
};

const StadiumsPage = () => {
  return <Stadiums />;
};

export default StadiumsPage;
