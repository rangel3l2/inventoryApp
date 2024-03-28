import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { SessionProvider, useSession } from "../auth/ctx";

const index = () => {
  const { session } = useSession();
  console.log(session);
  return (
    session && (<Redirect href="/(app)/" />) 
  );
};

export default index;

const styles = StyleSheet.create({});
