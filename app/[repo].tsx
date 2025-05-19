import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

interface RepositoryDetails {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
}

export default function RepositoryScreen() {
  const { repo } = useLocalSearchParams();
  const [repository, setRepository] = useState<RepositoryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repo}`
        );
        setRepository(response.data);
      } catch (error) {
        console.error('Error fetching repository details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [repo]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#24292e" />
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Repository not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{repository.name}</Text>
        <Text style={styles.fullName}>{repository.full_name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>
          {repository.description || 'No description available'}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>⭐ {repository.stargazers_count}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>👀 {repository.watchers_count}</Text>
          <Text style={styles.statLabel}>Watchers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>🍴 {repository.forks_count}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Language</Text>
          <Text style={styles.detailValue}>{repository.language || 'N/A'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Default Branch</Text>
          <Text style={styles.detailValue}>{repository.default_branch}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Created</Text>
          <Text style={styles.detailValue}>
            {new Date(repository.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Last Updated</Text>
          <Text style={styles.detailValue}>
            {new Date(repository.updated_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Owner</Text>
        <Text style={styles.ownerName}>{repository.owner.login}</Text>
      </View>

      <View style={styles.section}>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(repository.html_url)}
        >
          View on GitHub
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#586069',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24292e',
  },
  fullName: {
    fontSize: 16,
    color: '#586069',
    marginTop: 4,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  description: {
    fontSize: 16,
    color: '#24292e',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
  },
  statLabel: {
    fontSize: 12,
    color: '#586069',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#586069',
  },
  detailValue: {
    fontSize: 14,
    color: '#24292e',
    fontWeight: '500',
  },
  ownerName: {
    fontSize: 16,
    color: '#0366d6',
  },
  link: {
    fontSize: 16,
    color: '#0366d6',
    textDecorationLine: 'underline',
  },
}); 