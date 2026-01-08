import React from 'react';
import { RolePage } from '../../_components/RolePage';
import { ROLES } from '../../_constants/roles';

export default function AdminPage() {
  return (
    <RolePage role={ROLES.ADMIN} />
  );
}