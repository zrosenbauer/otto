import * as ottoBrowser from '@bluenova/otto-browser';
import * as _ from 'lodash';
import axios from 'axios';

import { DOMElement } from './DOMElement';
import { HTTP } from './HTTP';

// @todo assess moving to server and importing
interface Result {
  startTime: string;
  endTime: string;
  duration: number;
  actions: ottoBrowser.ActionResult[];
}

const URL_LOCAL_SERVER = 'http://localhost:5678';

/**
 * Core Class for interacting with Otto tests. This is a singleton that will be instantiated for each test file.
 * The actions will be reset everytime tests are asserted.
 */
export class Otto {
  private actions: ottoBrowser.Action[] = [];

  constructor () {
    this.addAction = this.addAction.bind(this);
  }

  // Browser Interface
  // -----

  /**
   * Query the DOM for an Element
   * @param selector
   * @returns DOMElement
   */
  public query (selector: string): DOMElement {
    return new DOMElement({
      addAction: this.addAction,
      selector
    });
  }

  /**
   * Navigate to a URL.
   * @param url
   * @returns HTTP
   */
  public navigate (url: string): HTTP {
    return new HTTP({
      addAction: this.addAction,
      url
    });
  }

  /**
   * Run queued all actions and assertions.
   */
  public async assert (): Promise<void> {
    // @todo automatically start server if not running already OR proxy to Cloud

    const result = await axios.post(`${URL_LOCAL_SERVER}/run`, {
      runTime: 'webkit',
      actions: this.actions
    });

    this.reset();
    this.handleResults(result.data);
  }

  /**
   * Reset the action queue.
   */
  public reset (): void {
    this.actions = [];
  }

  // Utils & Helpers
  // -----

  private handleResults (result: Result) {
    const failureEvents = _.compact(_.flatMap(result.actions, 'rule'));
    if (failureEvents.length) {
      throw new Error(`${failureEvents.length} Tests Failed:\n\n${_.map(failureEvents, 'params.methodName').join('\n')}`);
    }
  }

  private addAction (action: ottoBrowser.Action) {
    this.actions.push(action);
  }
}
