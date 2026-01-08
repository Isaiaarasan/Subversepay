import React from 'react';
import { RolePage } from '../../_components/RolePage';
import { ROLES } from '../../_constants/roles';

export default function TeamLeadPage() {
  return (
    <RolePage role={ROLES.TEAM_LEAD} />
  );
}