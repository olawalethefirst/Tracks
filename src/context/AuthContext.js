import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
import axios from "axios";

const authReducer = (state, action) => {
    switch (action.type) {
        case "signout":
            return { token: null, errorMessage: "" };
        case "clear_error":
            return { ...state, errorMessage: "" };
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "signin":
            return { errorMessage: "", token: action.payload };
        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        dispatch({
            type: "signin",
            payload: token,
        });
        navigate("TrackList");
    } else {
        navigate("Signup");
    }
};

const clearErrorMessage = (dispatch) => () =>
    dispatch({
        type: "clear_error",
    });

const signup = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerAPI.post("/signup", {
            email,
            password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({
            type: "signin",
            payload: "response.data.token",
        });
        navigate("TrackList");
    } catch (err) {
        dispatch({
            type: "add_error",
            payload: "Something went wrong with signup",
        });
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerAPI.post("/signin", {
            email,
            password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signin", payload: response.data.token });
        navigate("TrackList");
    } catch (err) {
        dispatch({
            type: "add_error",
            payload: "Something went wrong with signin",
        });
    }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem("token");
    dispatch({
        type: "signout",
    });
    navigate("loginFlow");
};

export const { Context, Provider } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: "" }
);
