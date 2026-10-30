'use client';

import React, { useState, useEffect } from 'react';
import TeamDirectory from '@/app/team/sections/TeamDirectory';
import { getTeamMembers } from '@/lib/strapi';

export default function TeamGridSection({ data = {} }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamMembers(30)
      .then((members) => {
        if (members && members.length > 0) setTeam(members);
      })
      .catch(() => {});
  }, []);

  return <TeamDirectory initialTeam={team} />;
}
