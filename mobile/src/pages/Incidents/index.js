import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        loadIncients()
    }, [])

    async function loadIncients() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })
        setIncidents([...incidents, ...response.data])
        setotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncients}
                onEndReachedThreshold={0.2}
                //showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incidentList}>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Icon name='arrow-right' size={16} color='#E02041' />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            />


        </SafeAreaView>
    )
}