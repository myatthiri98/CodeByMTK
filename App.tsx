// App.js
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {StreamChat} from 'stream-chat';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the StreamChat client with your API key
    const client = StreamChat.getInstance('tzuz64b5apfu');

    // Connect the user using a developer token
    const user = {
      id: 'john', // User ID
      name: 'John Doe', // User name
      image: 'https://getstream.io/random_svg/?name=John', // User image (optional)
    };

    const token = client.devToken('john'); // Generate a developer token for the user

    // Connect user to the chat client
    client
      .connectUser(user, token)
      .then(() => {
        setLoading(false); // Set loading to false once user is connected
      })
      .catch(err => {
        setLoading(false); // Handle error and stop loading
        setError('Error connecting user: ' + err.message);
      });

    // Clean up client on unmount
    return () => {
      client.disconnectUser();
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading chat...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>User connected to chat!</Text>
    </SafeAreaView>
  );
};

export default App;
