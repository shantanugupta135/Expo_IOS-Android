import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    // 👉 You can add API call / validation here

    // Navigate to HOME inside drawer
    router.replace("/(drawer)/home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Title */}
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 6 }}>
          Welcome Back 👋
        </Text>
        <Text style={{ color: "#666", marginBottom: 30 }}>
          Login to continue
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 14,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 14,
            borderRadius: 10,
            marginBottom: 24,
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}