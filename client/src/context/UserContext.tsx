import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URLS, url, User } from "../utils/util";
import axios from "axios";
import { noop } from "lodash";

interface UserContextType {
  user: User | undefined;
  users: User[];
  userIds: number[];
  loading: boolean;
  error: boolean;
  getAllUsers: () => void;
  getUser: (id: number) => Promise<any>;
  updateUser: (user: User) => void;
  updateUserIds: (users: number[]) => void;
}

const UserContext = createContext<UserContextType>({
  user: { id: 0, name: "", balance: 0, transactions: [] },
  users: [],
  userIds: [],
  loading: false,
  error: false,
  getAllUsers: noop,
  updateUser: noop,
  updateUserIds: noop,
  getUser: () => Promise.resolve(),
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [userIds, setUserIds] = useState<number[]>([]);

  const updateUser = (user: User) => setUser(user);
  const updateUserIds = (users: number[]) => setUserIds(users);

  const getMethod = async (url: string) => {
    setLoading(true);
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const postMethod = async (url: string, body?: any) => {
    setLoading(true);
    setError(false);
    try {
      await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    const Users = await getMethod(`${url}/${API_URLS.GET_USERS}`);
    setUsers(Users);
  };

  const getUser = async (id: number) => {
    const User = await getMethod(`${url}/${API_URLS.GET_USER}/${id}`);
    return User;
  };

  const getIds = async () => {
    const Users = await getMethod(`${url}/${API_URLS.GET_IDS}`);
    setUserIds(Users);
  };

  useEffect(() => {
    getIds();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        userIds,
        loading,
        error,
        getAllUsers,
        getUser,
        user,
        updateUser,
        updateUserIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => {
  return useContext(UserContext);
};
