import React, {useEffect, useState} from 'react';
import {Grid, Loader, Segment, Dimmer, Header, Divider, Card, CardDescription} from 'semantic-ui-react';
import './Dashboard.css'
import {api} from "../../api/api";
import {toast} from 'react-toastify';

export function Dashboard() {

    let loading = '';
    const [tournaments, setTournaments] = useState({});
    const [teams, setTeams] = useState({});

    useEffect(() => {
        async function getTopTournaments() {
            try {
                let tournaments = await api.getTopTournaments(5);
                setTournaments(tournaments.content)
            } catch (e) {
                toast.error("Error Fetching User Account.");
                console.log("Error Fetching User Account. Possible bad JWT, you will be logged out." + e);
            }
        }

        getTopTournaments();
    }, [tournaments.content]);


    useEffect(() => {
        async function getTopTeams() {
            try {
                let teams = await api.getTopTeams(5);
                setTeams(teams.content)
            } catch (e) {
                toast.error("Error Fetching User Account.");
                console.log("Error Fetching User Account. Possible bad JWT, you will be logged out." + e);
            }
        }

        getTopTeams();
    }, [teams.content]);

    return (
        <div style={{padding: "20px"}}>
            <Segment raised padded inverted className='main-segment-style'>
                <Dimmer active={loading !== ''}>
                    <Loader>{`Loading ${loading}...`}</Loader>
                </Dimmer>
                <Grid divided columns={2}>
                    <div className={'ten wide column'}>

                        <Grid.Column width={10} verticalAlign="top">
                            <Header color="teal" as="h1" content="Popular Tournaments"/>
                            <Divider/>
                            {tournaments.length > 0 ?
                                <Card.Group color="green" centered items={tournaments.map((tournament, i) => {
                                    return {
                                        children:
                                            <div className='portfolio-card-container'>
                                                <Grid style={{width: '100%', marginBottom:'-2rem'}} divided='vertically'>
                                                    <Grid.Row columns={4}>
                                                        <Grid.Column>
                                                            <Header content={tournament.name} color="teal"/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Game Name: ${tournament.gameName}`}/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Organizer: ${tournament.organizer}`}/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Next Match Date: ${tournament.nextMatchDate}`}/>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>,
                                        color: 'teal',
                                        fluid: true,
                                        className: "portfolio-cards",
                                        key: i,
                                        href: `/tournaments/${tournament.id}`
                                    }
                                })}/>
                                : 'No Upcoming tournaments scheduled.'}
                        </Grid.Column>
                        <Grid.Column style={{paddingTop: '2rem'}} width={10}>
                            <Header color="teal" as="h1" content="Top Teams"/>
                            {teams.length > 0 ?
                                <Card.Group color="green" centered items={teams.map((team, i) => {
                                    return {
                                        children:
                                            <div className='portfolio-card-container'>
                                                <Grid style={{width: '100%', marginBottom:'-2rem'}} divided='vertically'>
                                                    <Grid.Row columns={4}>
                                                        <Grid.Column>
                                                            <Header content={team.name} color="teal"/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Game Name: ${team.elo}`}/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Organizer: ${team.contact}`}/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Next Match Date: ${team.nextMatchDate}`}/>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>,
                                        color: 'teal',
                                        fluid: true,
                                        className: "portfolio-cards",
                                        key: i,
                                        href: `/teams/${team.id}`
                                    }
                                })}/>
                                : 'No Upcoming tournaments scheduled.'}
                            <Divider/>
                        </Grid.Column>
                    </div>
                    <Grid.Column width={6}>
                        <Header color="teal" as="h1" content="Recent Matches"/>
                        <Divider/>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )

}

