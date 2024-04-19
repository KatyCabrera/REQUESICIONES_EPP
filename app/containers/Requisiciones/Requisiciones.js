import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import TablaMateriales from './TablaMateriales';

function Requisiciones() {
  const title = 'Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Nueva Requisicion" whiteBg icon="ion-ios-menu-outline" desc="Creación de requisiciones de materiales de seguridad">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TablaMateriales />
          <TablaMateriales />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TablaMateriales />
          <TablaMateriales />
        </div>
      </PapperBlock>
    </div>
  );
}

export default Requisiciones;
