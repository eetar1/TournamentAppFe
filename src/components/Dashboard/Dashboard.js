import React, { useEffect, useState } from 'react'
import { Grid, Loader, Segment, Dimmer, Header, Divider, Card, CardDescription } from 'semantic-ui-react'
import './Dashboard.css'
import { api } from '../../api/api'
import { toast } from 'react-toastify'

export function Dashboard () {
  const loading = ''
  const [tournaments, setTournaments] = useState({})
  const [teams, setTeams] = useState({})
  const [matches, setMatches] = useState([])

  useEffect(() => {
    async function getTopTournaments () {
      try {
        const tournaments = await api.getTopTournaments(5)
        setTournaments(tournaments.content)
      } catch (e) {
        toast.error('Error Fetching Tournaments.')
        console.log('Error Fetching Tournaments' + e)
      }
    }

    getTopTournaments()
  }, [])

  useEffect(() => {
    async function getRecentMatches () {
      try {
        const matches = await api.getRecentMatches(5)
        setMatches(matches.content)
      } catch (e) {
        toast.error('Error Fetching Matches.')
        console.log('Error Fetching Matches' + e)
      }
    }

    getRecentMatches()
  }, [])

  useEffect(() => {
    async function getTopTeams () {
      try {
        const teams = await api.getTopTeams(5)
        setTeams(teams.content)
      } catch (e) {
        toast.error('Error Fetching Teams.')
        console.log('Error Fetching Teams.' + e)
      }
    }

    getTopTeams()
  }, [])

  return (
        <div style={{ padding: '20px' }}>
            <Segment raised padded inverted className='main-segment-style'>
                <Dimmer active={loading !== ''}>
                    <Loader>{`Loading ${loading}...`}</Loader>
                </Dimmer>
                <Grid divided columns={2}>
                    <div className={'ten wide column'}>

                        <Grid.Column width={10} verticalAlign="top">
                            <Header color="teal" as="h1" content="Popular Tournaments"/>
                            <Divider/>
                            {tournaments.length > 0
                              ? <Card.Group color="green" centered items={tournaments.map((tournament, i) => {
                                return {
                                  children:
                                            <div className='portfolio-card-container'>
                                                <Grid columns={5} style={{ width: '100%', marginBottom: '-2rem' }}
                                                      divided='vertically'>
                                                    <Grid.Row>
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
                                                                content={`Status: ${tournament.status}`}/>
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
                                  className: 'portfolio-cards',
                                  key: i,
                                  href: `/tournaments/${tournament.id}`
                                }
                              })}/>
                              : 'No Upcoming tournaments scheduled.'}
                        </Grid.Column>
                        <Grid.Column style={{ paddingTop: '2rem' }} width={10}>
                            <Header color="teal" as="h1" content="Top Teams"/>
                            <Divider/>
                            {teams.length > 0
                              ? <Card.Group color="green" centered items={teams.map((team, i) => {
                                return {
                                  children:
                                            <div className='portfolio-card-container'>
                                                <Grid style={{ width: '100%', marginBottom: '-2rem' }}
                                                      divided='vertically'>
                                                    <Grid.Row columns={4}>
                                                        <Grid.Column>
                                                            <Header content={team.name} color="teal"/>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <CardDescription
                                                                content={`Team Elo: ${team.elo}`}/>
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
                                  className: 'portfolio-cards',
                                  key: i,
                                  href: `/teams/${team.id}`
                                }
                              })}/>
                              : 'No Upcoming tournaments scheduled.'}
                        </Grid.Column>
                    </div>
                    <Grid.Column width={6}>
                        <Header color="teal" as="h1" content="Recent Matches"/>
                        <Divider/>
                        {matches.length > 0
                          ? <Card.Group color="green" centered items={matches.map((match, i) => {
                            return {
                              //  To be scored matches
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid columns={12} style={{ width: '100%', marginBottom: '-2rem' }}
                                                  divided='vertically'>
                                                <Grid.Row>
                                                    <Grid.Column width={2}>
                                                        <Header
                                                            content={`${match.homeTeam.name} vs. ${match.awayTeam.name}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column width={4}>
                                                        <CardDescription
                                                            content={`Game Name: ${match.gameName}`}/>
                                                    </Grid.Column>

                                                    {match.tournamentName
                                                      ? <Grid.Column width={5}>
                                                            <CardDescription
                                                                content={`Tournament Name: ${match.tournamentName}`}
                                                                color="teal"/>
                                                        </Grid.Column>
                                                      : ''}
                                                    <Grid.Column width={4}>
                                                        <CardDescription
                                                            content={`Result: ${match.result}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                        <CardDescription
                                                            content={`Score: ${match.score}`}
                                                            color="teal"/>
                                                    </Grid.Column>

                                                </Grid.Row>
                                            </Grid>
                                        </div>,
                              color: 'teal',
                              fluid: true,
                              className: 'portfolio-cards',
                              key: i,
                              href: `/match/${match.id}`
                            }
                          })}/>
                          : 'Matches will appear here after their scheduled date'}

                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
  )
}
