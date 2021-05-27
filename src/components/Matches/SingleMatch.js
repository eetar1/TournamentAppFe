import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'
import { toast } from 'react-toastify'
import { Grid, Header, Divider, Card, CardDescription, Segment, Button, GridColumn } from 'semantic-ui-react'
import './match.css'
import { SetMatchDateModal } from './SetMatchDateModal'
import { SetMatchScoreModal } from './SetMatchScoreModal'

export function Match () {
  const matchId = useParams().id
  const [match, setMatch] = useState({ homeTeam: { teamMembers: [] }, awayTeam: { teamMembers: [] } })
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)

  useEffect(() => {
    async function getMatch () {
      try {
        const match = await api.getMatchById(matchId)
        setMatch(match)
      } catch (e) {
        toast.error('Error fetching match.')
        console.log('Error Fetching  match' + e)
      }
    }

    getMatch()
  }, [matchId, showScheduleModal, showScoreModal])

  function matchComplete () {
    return match.matchDate && new Date(match.matchDate) < new Date()
  }

  return (
        <div style={{ padding: '20px' }}>
            <Segment raised padded inverted className='main-segment-style'>
                <Grid divided columns={2} style={{ padding: '0 .5em 0 2em' }}>
                    <Grid.Column verticalAlign="top">
                        <Header className='match-title' size='huge'
                                color='teal'>{match?.homeTeam?.name} vs. {match?.awayTeam?.name} {match.status === 'Complete' ? 'Complete' : ''}</Header>
                        <h5 style={{ float: 'left' }}>{`Match Date:  ${match.matchDate ? new Date(match.matchDate).toLocaleString().slice(0, -3) : 'Unscheduled'}`}</h5>
                    </Grid.Column>

                    <Grid.Column verticalAlign="top">
                        <Button disabled={!matchComplete()} floated='right' positive size={'small'}
                                content="Set Score" onClick={() => setShowScoreModal(true)}/>
                        <Button floated='right' positive size={'small'} content="Schedule"
                                onClick={() => setShowScheduleModal(true)}/>

                    </Grid.Column>
                </Grid>

                <Divider style={{ margin: '.5em 0 1em 0' }}/>
                {match.tournamentName
                  ? <div><Grid divided columns={3} style={{ padding: '0 .5em 0 2em' }}>
                        {match.tournamentName
                          ? <Grid.Column verticalAlign="top">
                                <Header color='teal'>{`Part of tournament: ${match.tournamentName}`} </Header>
                            </Grid.Column>
                          : ''}
                    </Grid>
                        <Divider style={{ margin: '1em 0 1em 0' }}/>
                    </div>
                  : ''
                }

                {match.status === 'Complete'
                  ? <div>
                        < Grid divided columns={12} style={{ padding: '0 1em  0 2em' }}>
                            <GridColumn>
                                <Header size='large' color='teal'>{`Score: ${match.score}`} </Header>
                            </GridColumn>
                            <GridColumn width={4}>
                                <Header size='large' color='teal'>{`Result: ${match.result}`} </Header>
                            </GridColumn>
                        </Grid>
                        <Divider style={{ margin: '1em 0 1em 0' }}/>
                    </div>
                  : ''

                }

                <Grid divided columns={2} style={{ padding: '0 .5em 0 2em' }}>

                    <Grid.Column verticalAlign="top">
                        <Header color="teal" as="h1" content={'Home Team: ' + match.homeTeam.name}/>
                        {match.homeTeam.teamMembers.length > 0
                          ? <Card.Group color="green" centered items={match.homeTeam.teamMembers.map((member, i) => {
                            return {
                              //  My Teams
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Header content={member.position + ': ' + member.name}
                                                                color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription content={`Elo: ${member.elo}`} color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Next Match Date: ${member.nextMatchDate}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </div>,
                              color: 'teal',
                              fluid: true,
                              className: 'portfolio-cards',
                              key: i,
                              href: `/matches/${member.id}`
                            }
                          })}/>
                          : 'You are not currently the contact for any teams'}
                    </Grid.Column>
                    <Grid.Column className='rightColumn' verticalAlign="top">
                        <Header color="teal" as="h1" content={'Away Team: ' + match.awayTeam.name}/>
                        {match.awayTeam.teamMembers.length > 0
                          ? <Card.Group color="green" centered items={match.awayTeam.teamMembers.map((member, i) => {
                            return {
                              //  My Teams
                              children:
                                        <div className='portfolio-card-container'>
                                            <Grid style={{ width: '100%', marginBottom: '-2rem' }} divided='vertically'>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column>
                                                        <Header content={member.position + ': ' + member.name}
                                                                color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription content={`Elo: ${member.elo}`} color="teal"/>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CardDescription
                                                            content={`Next Matchs Date: ${member.nextMatchDate}`}
                                                            color="teal"/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </div>,
                              color: 'teal',
                              fluid: true,
                              className: 'portfolio-cards',
                              key: i,
                              href: `/matches/${member.id}`
                            }
                          })}/>
                          : 'You are not currently the contact for any teams'}
                    </Grid.Column>
                </Grid>
            </Segment>
            <SetMatchDateModal onClose={() => setShowScheduleModal(false)} open={showScheduleModal} matchId={matchId}/>
            <SetMatchScoreModal onClose={() => setShowScoreModal(false)} open={showScoreModal} matchId={matchId}/>
        </div>
  )
}
