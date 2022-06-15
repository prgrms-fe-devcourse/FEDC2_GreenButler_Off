import React from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Button from 'components/basic/Button';
import { IMAGE_URLS } from 'utils/constants/images';
import PropTypes from 'prop-types';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
`;

const Nickname = styled(Text)`
  margin-left: 20px;
`;

const FollowBtn = styled(Button)``;

const UserSearchResult = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <ProfileContainer key={user._id}>
            <Profile>
              <Avatar size={60} src={IMAGE_URLS.PROFILE_iMG} />
              <Nickname fontSize={18}>{user.fullName}</Nickname>
            </Profile>
            <FollowBtn
              width={100}
              height={30}
              borderRadius={10}
              fontSize="16px"
              style={{ flexShrink: 0 }}
            >
              팔로우
            </FollowBtn>
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
