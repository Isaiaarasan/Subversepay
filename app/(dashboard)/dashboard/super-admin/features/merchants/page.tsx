import React from 'react';
import { getMerchants } from '../../../services/merchants.service';
import MerchantsClient from './merchants-client';

export default async function MerchantsPage() {
  // Artificial delay is handled in the service
  const merchants = await getMerchants();

  return <MerchantsClient initialMerchants={merchants} />;
}
