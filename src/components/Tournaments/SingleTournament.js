import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'
import { toast } from 'react-toastify'
import { Divider, Grid, Header, Segment } from 'semantic-ui-react'
import Tree from 'react-tree-graph'

export function Tournament () {
  const tournamentId = useParams().id
  // eslint-disable-next-line no-unused-vars
  const [tournament, setTournament] = useState(null)
  const [bracket, setBracket] = useState(null)

  useEffect(() => {
    async function getTournament () {
      try {
        const tournamentReq = await api.getTournamentById(tournamentId)
        setTournament(tournamentReq)

        const root = { name: 'root', children: buildChildren(tournamentReq, 1, tournamentReq.matches.length) }
        setBracket(root)
      } catch (e) {
        toast.error('Error fetching tournament.')
        console.log('Error Fetching  tournament' + e)
      }
    }

    getTournament()
  }, [tournamentId])

  function buildChildren (tournament, tier, end) {
    if (tier >= end) {
      return []
    }
    tier++
    const leftChild = { name: 'f', children: buildChildren(tournament.matches[tier - 1], tier, end) }
    const rightChild = { name: 'r', children: buildChildren(tournament.matches[tier - 1], tier, end) }
    return [leftChild, rightChild]
  }

  if (tournament && bracket) {
    return (<div style={{ padding: '20px' }}>
          <Segment raised padded inverted className='main-segment-style'>
              <Grid divided columns={2} style={{ padding: '0 .5em 0 2em' }}>
                  <Header className='match-title' size='huge'
                          color='teal'>{tournament?.name}</Header>
              </Grid>
              <Divider/>
              < Grid divided columns={12} style={{ padding: '0 1em  0 2em' }}>
                  <Grid.Column >
                      <Header size='large'
                              color='teal'>{`Game: ${tournament.gameName}`} </Header>
                  </Grid.Column>
                  {tournament.victor
                    ? <Grid.Column width={2}>
                          <Header size='large'
                                  color='teal'>{`Victor: ${tournament.victor}`} </Header>
                      </Grid.Column>
                    : ''}

                  <Grid.Column width={2}>
                      <Header size='large'
                              color='teal'>{`Official: ${tournament.organizer}`} </Header>
                  </Grid.Column>
                  <Grid.Column width={2}>
                      <Header size='large'
                              color='teal'>{`Current Round: ${tournament.round}`} </Header>
                  </Grid.Column>

              </Grid>
              <Tree
                  data={bracket}
                  height={400}
                  width={400}/>
          </Segment>
      </div>)
  } else {
    return <div/>
  }
}
