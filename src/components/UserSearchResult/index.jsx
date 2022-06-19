import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
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

const UserSearchResult = ({ users }) => {
  const navigate = useNavigate();

  const onClickProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      {users &&
        users.map((user) => {
          return (
            <ProfileContainer key={user._id}>
              <Profile onClick={() => onClickProfile(user._id)}>
                <Avatar size={60} src={IMAGE_URLS.PROFILE_IMG} />
                <Text style={{ marginLeft: 20 }} fontSize={18} block>
                  {user.fullName}
                </Text>
              </Profile>
            </ProfileContainer>
          );
        })}
    </>
  );
};

UserSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default UserSearchResult;
