import { Card, Checkbox, Grid } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../../../Utils/axiosUtil';
import { display, useTheme } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import Search from '../../../Components/Common/Search';
import HorizontalLine from '../../../Components/Common/HorizontalLine';
import MemberCard from '../../../Components/Common/MemberCard';
import { IMember } from '../../../Utils/types/type';


export default function ManagaeGroupMember() {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const { data: people, isLoading, isError } = useQuery({
    queryKey: ['people', searchText],
    queryFn: async () => {
      if (searchText === '') {
        const response = await axiosInstance.get(`/user/users-of`);
        return response.data;
      } else {
        const response = await axiosInstance.get(`/user/search?name=${searchText}`);
        return response.data;
      }
    },
  });

  const handleToggle = (email: any) => {
    console.log("email", email)
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(email)) {
        // Remove member if already selected
        return prevSelected.filter((selectedEmail) => selectedEmail !== email);
      } else {
        // Add member if not selected
        return [...prevSelected, email];
      }
    });
  };

  const handleAdd = () => {
    // Implement your add logic here
    console.log('Add selected members:', selectedMembers);
  };

  const handleRemove = () => {
    // Implement your remove logic here
    console.log('Remove selected members:', selectedMembers);
  };

  const handleReset = () => {
    // Implement your reset logic here
    setSelectedMembers([]);
  };
  
  return (
    <Grid container spacing={5} px={3} pt={2} mb={1}>
      <Grid item xs={12} sm={6} sx={{ borderBottom: { xs: 1, sm: 'thin' }, borderColor: 'black', position: "relative" }}>
        <Grid>
          <Search setText={setSearchText} />
        </Grid>
        <HorizontalLine style={{ marginTop: '10px', marginBottom: '10px', position: "absolute", height: "100%", right: "-20px", top: "56px", background: 'linear-gradient(to right, #2196F3, #FF5722)' }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Search setText={setSearchText} />
        <Grid  sx={{ maxHeight: '90vh', pb: 15, overflowY: 'auto'}}>
          {people?.map((ppl : any) => (
            <Card key={ppl.email} sx={{ mt: 1.5, borderRadius: '16px', display: "flex", alignItems: "center"}}>
              <Grid>
                <Checkbox checked={selectedMembers.includes(ppl.email)} onChange={(e) => { handleToggle(ppl.email) }} />
              </Grid>
              <MemberCard  title={ppl.name} subtitle={ppl.email || ''}/>
          </Card>))}
        </Grid>
      </Grid>
    </Grid>
  )
}
