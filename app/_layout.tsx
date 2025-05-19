import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'GitHub Repository Search',
            headerStyle: {
              backgroundColor: '#24292e',
            },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="[repo]" 
          options={{
            title: 'Repository Details',
            headerStyle: {
              backgroundColor: '#24292e',
            },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </>
  );
} 