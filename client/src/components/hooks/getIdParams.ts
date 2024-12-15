import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { User } from "../../utils/util";

const useQueryParamUser = (updateID: (id: number | undefined) => void) => {
  const { getUser } = UserData();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const prevUserId = Number(queryParams.get("id")) || undefined;

  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser(prevUserId as number);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("in useEffect");
    if (prevUserId !== undefined) {
      console.log("running");
      setUserId(prevUserId);
      updateID(prevUserId);
      fetchUser();
    }
  }, [prevUserId]);

  return { userId, user, loading };
};

export default useQueryParamUser;
