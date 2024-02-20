// 👇 YOUR WORK STARTS ON LINE 19
import React from 'react'
import { render, waitFor, screen, getByTestId, getByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import App from '../App'

describe('Stranger Things App', () => {
  let user
  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
  })
  test('App mounts without crashing', () => {
    // 👉 TASK: print the simulated DOM using screen.debug
    render(<App />)
  })
  test('App renders the correct texts', async () => {
    // 👉 TASK: click on the button that displays "Press to Get Show Data"
    user.click(screen.getByText('Press to Get Show Data'))

    // 👉 TASK: create a waitFor and await for the following to be true:
    await waitFor(() => {
      //    - The text "Press to Get Show Data" is no longer in the DOM
      expect(screen.queryByText("Press to Get Show Data")).toBeNull()
      //    - The text "Stranger Things" exists in the DOM
      expect(screen.queryByText('Stranger Things')).toBeVisible()
      //    - The text "A love letter to the '80s classics that captivated a generation" exists in the DOM
      // ❗ You will need { exact: false } to select the longer text
      expect(screen.queryByText("A love letter to the '80s classics that captivated a generation", { exact: false })).toBeVisible()
      //    - The text "Select A Season" exists in the DOM
      expect(screen.queryByText('Select A Season')).toBeVisible()
    })

    
    // 👉 TASK: select Season 2 from the dropdown
    // ❗ Don't forget user actions need the await keyword
    // ❗ Use the selectOptions user action
    // ❗ Grab the select element using querySelector
    const dropDown = screen.getByRole('combobox');
    await user.selectOptions(dropDown, 'Season 2')
    
    await waitFor(() => {
      // 👉 TASK: create the following assertions:
      //    - The text "Season 2, Episode 1" exists in the DOM
      expect(screen.queryByText("Season 2, Episode 1")).toBeVisible()
      //    - The text "Chapter One: MADMAX" exists in the DOM
      expect(screen.queryByText("Chapter One: MADMAX")).toBeVisible()
      //    - The text "One year after the events with the Upside Down and the Demogorgon" exists in the DOM
      expect(screen.queryByText("One year after the events with the Upside Down and the Demogorgon", {exact: false})).toBeVisible()
      // ❗ You will need { exact: false } to select the longer text
    })

  })
})
