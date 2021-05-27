import { Divider, Grid, Header, Segment, Button, CardDescription, Card } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { api } from '../../api/api'
import { toast } from 'react-toastify'
import './MyPage.css'
import { CreateMatchModal } from './Modals/CreateMatchModal'
import { CreateTeamModal } from './Modals/CreateTeamModal'
import { CreateTournamentModal } from './Modals/CreateTournamentModal'

export function MyPage () {
  const [toBeScheduled, setToBeScheduled] = useState([])
  const [toBeScored, setToBeScored] = useState([])
  const [myTeams, setMyTeams] = useState([])
  const [myTournaments, setMyTournaments] = useState([])

  const [createMatchModal, setCreateMatchModal] = useState(false)
  const [createTeamModal, setCreateTeamModal] = useState(false)
  const [createTournamentModal, setCreateTournamentModal] = useState(false)

  useEffect(() => {
    async function getToBeScheduledMatches () {
      try {
        const matches = await api.getToBeScheduledMatches(5)
        setToBeScheduled(matches.content)
      } catch (e) {
        toast.error('Error to be scheduled matches.')
        console.log('Error Fetching to be scheduled matches' + e)
      }
    }

    getToBeScheduledMatches()
  }, [createMatchModal, createTournamentModal])

  useEffect(() => {
    async function getToBeScoredMatches () {
      try {
        const matches = await api.getToBeScoredMatches(5)
        setToBeScored(matches.content)
      } catch (e) {
        toast.error('Error Fetching to be scored matches.')
        console.log('Error Fetching  to be scored matches' + e)
      }
    }

    getToBeScoredMatches()
  }, [createMatchModal])

  useEffect(() => {
    async function getMyTeams () {
      try {
        const teams = await api.getMyTeams(5)
        setMyTeams(teams.content)
      } catch (e) {
        toast.error('Error getting my teams.')
        console.log('Error Fetching my teams' + e)
      }
    }

    getMyTeams()
  }, [createTeamModal, createMatchModal, createTournamentModal])

  useEffect(() => {
    async function getMyTournaments () {
      try {
        const tournaments = await api.getMyTournaments(5)
        setMyTournaments(tournaments.content)
      } catch (e) {
        toast.error('Error getting my tournaments.')
        console.log('Error Fetching my teams' + e)
      }
    }

    getMyTournaments()
  }, [createTournamentModal])

  return (
        <div style={{ padding: '20px' }}>
            <Segment raised padded inverted className='main-segment-style'>
                <Grid divided columns={2}>
                    <Grid.Column>
                        <Header color="teal" as="h1" content="Matches to be scheduled"/>
                        <Button color="green" content="Create Matchs" onClick={() => setCreateMatchModal(true)}/>
                        <Divider/>
                        {toBeScheduled.length > 0
                          ? <Card.Group color="green" centered items={toBeScheduled.map((match, i) => {
                            return {
                              //  To be scheduled matches
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns='3'>
                                                    <Grid.Column>
                                                        <Header
                                                            content={`${match.homeTeam.name} vs. ${match.awayTeam.name}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`${match.homeTeam.name} Contact: ${match.homeTeam.contact}`}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`${match.awayTeam.name} Contact: ${match.awayTeam.contact}`}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Game Name: ${match.gameName}`}/>
                                                    </Grid.Column>

                                                    {match.tournamentName
                                                      ? <Grid.Column>
                                                            <CardDescription
                                                                content={`Tournament Name: ${match.tournamentName}`}
                                                                color="teal"/>
                                                        </Grid.Column>
                                                      : ''}
                                                    {match.matchDate
                                                      ? <Grid.Column>
                                                            <CardDescription
                                                                content={`Match Date: ${new Date(match.matchDate).toLocaleString().slice(0, -3)}`}
                                                                color="teal"/>
                                                        </Grid.Column>
                                                      : ''}

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
                          : 'No Matches to be scheduled'}
                    </Grid.Column>
                    <Grid.Column className={'rightColumn'}>
                        <Header color="teal" as="h1" content="Matches to be scored"/>
                        <Divider/>
                        {toBeScored.length > 0
                          ? <Card.Group color="green" centered items={toBeScored.map((match, i) => {
                            return {
                              //  To be scored matches
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Header
                                                            content={`${match.homeTeam.name} vs. ${match.awayTeam.name}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Game Name: ${match.gameName}`}/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Match Date: ${match.matchDate}`}/>
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
                    <Grid.Column>
                        <Header color="teal" as="h1" content="My Teams"/>
                        <Button color="green" content="Form Team" onClick={() => setCreateTeamModal(true)}/>
                        <Divider/>
                        {myTeams.length > 0
                          ? <Card.Group color="green" centered items={myTeams.map((team, i) => {
                            return {
                              //  My Teams
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Header content={team.name} color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription content={`Elo: ${team.elo}`} color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Next Match Date: ${team.nextMatchDate ? new Date(team.nextMatchDate).toLocaleString().slice(0, -3) : null}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </div>,
                              color: 'teal',
                              fluid: true,
                              className: 'portfolio-cards',
                              key: i,
                              href: `/team/${team.id}`
                            }
                          })}/>
                          : 'You are not currently the contact for any teams'}
                    </Grid.Column>
                    <Grid.Column className={'rightColumn'}>
                        <Header color="teal" as="h1" content="My Tournaments"/>
                        <Button color="green" content="Form Tournament" onClick={() => setCreateTournamentModal(true)}/>
                        <Divider/>
                        {myTournaments.length > 0
                          ? <Card.Group color="green" centered items={myTournaments.map((tournament, i) => {
                            return {
                              //  My Teams
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Header content={tournament.name} color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription content={`Game Name: ${tournament.gameName}`}
                                                                         color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Next Matchs Date: ${new Date(tournament.nextMatchDate).toLocaleString().slice(0, -3)}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </div>,
                              color: 'teal',
                              fluid: true,
                              className: 'portfolio-cards',
                              key: i,
                              href: `/tournament/${tournament.id}`
                            }
                          })}/>
                          : 'You are not currently the organizer of any tournaments'}
                    </Grid.Column>
                </Grid>
            </Segment>
            {/*    Modals */}
            <CreateMatchModal open={createMatchModal} handleCloseModal={async () => {
              setCreateMatchModal(false)
            }}/>
            <CreateTeamModal open={createTeamModal} handleCloseModal={() => setCreateTeamModal(false)}/>
            <CreateTournamentModal open={createTournamentModal}
                                   handleCloseModal={() => setCreateTournamentModal(false)}/>
        </div>
  )
}
