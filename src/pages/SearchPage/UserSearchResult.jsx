import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Avatar, Text, NoResultMessage } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
`;

const UserSearchResult = ({ users, isSearch }) => {
  const navigate = useNavigate();

  const onClickProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      {users?.length > 0
        ? users?.map((user) => {
            return (
              <ProfileContainer key={user._id}>
                <Profile onClick={() => onClickProfile(user._id)} style={{ padding: '0px 20px' }}>
                  <Avatar size={60} src={user.image || IMAGE_URLS.PROFILE_IMG} />
                  <Text style={{ marginLeft: 20 }} fontSize={18} fontWeight={500} block>
                    {user.fullName}
                  </Text>
                </Profile>
              </ProfileContainer>
            );
          })
        : isSearch && <NoResultMessage />}
    </>
  );
};

UserSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default UserSearchResult;
