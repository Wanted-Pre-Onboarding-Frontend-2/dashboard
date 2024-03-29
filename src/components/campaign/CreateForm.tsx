import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  styled,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

import { campaignItemState } from '../../store/campaign';
import { useRecoilState } from 'recoil';
import { CampaignItem } from '../../types/campaign';

const CreateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [campaignItem, setCampaignItem] =
    useRecoilState<CampaignItem[]>(campaignItemState);

  const titleRef = useRef<HTMLInputElement | any>(null);
  const statusRef = useRef<HTMLDivElement | any>(null);
  const startDateRef = useRef<HTMLDivElement | any>(null);
  const endDateRef = useRef<HTMLDivElement | any>(null);
  const budgetRef = useRef<HTMLDivElement | any>(null);
  const roasRef = useRef<HTMLDivElement | any>(null);
  const convValueRef = useRef<HTMLDivElement | any>(null);
  const costRef = useRef<HTMLDivElement | any>(null);

  const [inputs, setInputs] = useState({
    title: '',
    status: '',
    date: '',
    budget: 0,
    roas: 0,
    convValue: 0,
    cost: 0,
  });
  const [type, setType] = useState('');
  const [postedStatus, setPostedStatus] = useState('');

  // const { title, status, date, budget, roas, convValue, cost } = inputs;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    // console.log(value, name);

    setInputs({
      ...inputs,
      [name]: value,
    });
    // console.log(inputs);
  };

  const handleCampaignType = (event: any) => {
    setType(event.target.value);
  };

  const handleCampaignStatus = (event: any) => {
    setPostedStatus(event.target.value);
  };

  const onCreateCampaign = () => {
    const newCampaign: CampaignItem = {
      id: 0, // FIXME:
      adType: type,
      title: inputs.title,
      budget: inputs.budget,
      status: inputs.status,
      report: {
        cost: inputs.cost,
        convValue: inputs.convValue,
        roas: inputs.roas,
      },
    };
    setCampaignItem([...campaignItem, newCampaign]);
    // setInputs('') // 초기화
    // console.log('input.title : ', inputs.title);
    // console.log('newCampaign : ', newCampaign);
    // console.log('campaignItem : ', campaignItem);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Title>광고 만들기</Title>
        <AddForm onSubmit={onCreateCampaign}>
          <InputBox>
            <TextField
              id="standard-multiline-flexible"
              label="제목"
              multiline
              ref={titleRef}
              value={inputs.title}
              name="title"
              onChange={handleChange}
              variant="standard"
            />
            <FormControl
              sx={{ minWidth: 120, marginTop: 2 }}
              size="small"
            >
              <Select
                value={type}
                onChange={handleCampaignType}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>광고 타입</em>
                </MenuItem>
                <MenuItem value={'WEB'}>WEB</MenuItem>
                <MenuItem value={'APP'}>APP</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-multiline-flexible"
              label="일 희망 예산"
              multiline
              ref={budgetRef}
              onChange={handleChange}
              variant="standard"
            />
            <FormControl
              sx={{ minWidth: 120, marginTop: 2 }}
              size="small"
            >
              <Select
                value={postedStatus}
                onChange={handleCampaignStatus}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>광고 상태</em>
                </MenuItem>
                <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                <MenuItem value={'ENDED'}>ENDED</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-multiline-flexible"
              label="광고 생성일"
              multiline
              ref={startDateRef}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              id="standard-multiline-flexible"
              label="광고 마감일"
              multiline
              ref={endDateRef}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              id="standard-multiline-flexible"
              label="광고 비용"
              multiline
              ref={costRef}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              id="standard-multiline-flexible"
              label="매출"
              multiline
              ref={convValueRef}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              id="standard-multiline-flexible"
              label="광고 수익률"
              multiline
              ref={roasRef}
              onChange={handleChange}
              variant="standard"
            />
          </InputBox>
        </AddForm>
        <ButtonBox>
          <Button
            variant="contained"
            style={{
              borderRadius: 12,
              backgroundColor: '#727272',
              padding: '0 1.5rem',
            }}
            onClick={() => navigate('/campaign-manage')}
          >
            목록으로
          </Button>
          <Button
            onClick={onCreateCampaign}
            variant="contained"
            style={{
              borderRadius: 12,
              backgroundColor: '#586CF5',
              padding: '0 1.5rem',
            }}
          >
            광고 만들기
          </Button>
        </ButtonBox>
      </Box>
    </div>
  );
};

export default CreateForm;

const Title = styled('header')({
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '1.5rem',
  color: '#4e4e4e',
  margin: '1rem 0',
});
const AddForm = styled('div')({
  backgroundColor: 'pink',
  width: '30rem',
  height: '36rem',
  background: '#ffffff',
  boxShadow: '5px 5px 10px 5px rgba(0, 0, 0, 0.25)',
  borderRadius: '3rem',
  margin: '0 auto',
  position: 'relative',
});
const ButtonBox = styled('div')({
  width: '30rem',
  height: '2.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
  marginTop: '2rem',
});
const InputBox = styled('div')({
  width: '25rem',
  height: '37rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: '#acacac',
  padding: '4rem 2rem',
  boxSizing: 'border-box',
  margin: '0 auto',
});
