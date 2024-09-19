import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      // console.log("got categories", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("error" + error.message);
    }
  };
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("got recipe", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
      // console.log(response.data);
    } catch (error) {
      console.log("error" + error.message);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="space-y-6 pt-14"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/food-photos/avatar.png")}
            style={{
              height: hp(5),
              width: hp(5),
              borderWidth: 1 / 4,
              borderRadius: 99,
              borderColor: "#ededed",
              backgroundColor: "#ededed",
            }}
          />
          <BellIcon color="gray" size={hp(4)} />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontsize: hp(1.7) }} className="text-neutral-600">
            Hello, Tevfik
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        {/*search bar*/}

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            {/* <TouchableOpacity onPress={handleSearch}> */}
            <MagnifyingGlassIcon color="gray" size={hp(2.5)} strokeWidth={3} />
            {/* </TouchableOpacity> */}
          </View>
        </View>
        {/*categories*/}
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        {/*recipes*/}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
