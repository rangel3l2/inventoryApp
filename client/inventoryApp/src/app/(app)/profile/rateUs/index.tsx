import React, { useState } from "react";
import { View, Text } from "react-native";
import Rate from "@/src/components/Profile/Rating";
import MyButton from "@/src/components/MyButton";
import { useRouter } from "expo-router";
import CustomModal from "@/src/components/inventario/CustomModal";
const RateUs = () => {
  const [title, setTitle] = useState("Avalie nosso Aplicativo:"); // [1]
  const navigation = useRouter();
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [rating, setRating] = useState(0);
  const handleRate = (rating: number) => {
    setRating(rating);
 
  };
  const handleSend = () => {
       // Handle the rating       
       if (rating !==0) {
         setTitle("Obrigado por avaliar nosso aplicativo!"); // [2]
       setTimeout(() => {
        navigation.back();
       }, 1000);
       }else{
         setShowModalInfo(true);
         setWarningMessage("Favor marcar alguma estrela!");
         setTimeout(() => {
           setShowModalInfo(false);
         }, 1500);
       }
      
    // Handle sending the rating to the server
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {showModalInfo&&<CustomModal
        title="Avaliação"
        message={warningMessage}
        visible={showModalInfo}
      />}
      <Rate onRate={handleRate} title={title} />
      <MyButton
        handlePress={handleSend as any}
        typeNavigator="back"
        title="Confirmar"
        icon={"rightcircle"}
      />
    </View>
  );
};

export default RateUs;
