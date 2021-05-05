import * as ottoBrowser from '../../../otto-browser/src/main';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

export interface Props {
  addAction (action: ottoBrowser.Action): void

  selector: string;
}

/**
 * Class used to represent a DOM Element(s). Used to interact with and
 * queue assertions for the DOM Element(s).
 */
export class DOMElement {
  public selector: string;
  public readonly addAction: Props['addAction'];

  constructor (props: Props) {
    this.selector = props.selector;
    this.addAction = props.addAction;
  }

  // Actions
  // -----

  /**
   * Send a Click event to a DOM Element.
   */
  public click (): DOMElement {
    this.addAction({
      type: 'click',
      id: uuid(),
      selector: this.selector
    });
    return this;
  }

  /**
   * Send a select event for an option list.
   */
  public select (values: string[]): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'select',
      id,
      value: values,
      selector: this.selector
    });
    return this;
  }

  /**
   * Send type events to an input or textarea field.
   */
  public type (value: string): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'type',
      id,
      value,
      selector: this.selector
    });
    return this;
  }

  /**
   * Send a check event to a checkbox input.
   */
  public check (): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'check',
      id,
      selector: this.selector
    });
    return this;
  }

  /**
   * Send an ucheck event to a checkbox input.
   */
  public uncheck (): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'uncheck',
      id,
      selector: this.selector
    });
    return this;
  }

  // Assertions
  // ------

  /**
   * Validate if the DOM Element has an expected value.
   * @param value
   */
  public hasValue (value: string): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'query',
      id,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: id
          },
          {
            fact: 'browser',
            path: '$.elements[*].innerText',
            operator: 'containsEvery',
            value
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('hasValue', value)
        }
      },
      selector: this.selector
    });
    return this;
  }

  /**
   * Validate if a DOM Element is visible.
   */
  public isVisible (): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'query',
      id,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: id
          },
          {
            fact: 'browser',
            path: '$.elements[*].visible',
            operator: 'containsEvery',
            value: true
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('isVisible')
        }
      },
      selector: this.selector
    });
    return this;
  }

  /**
   * Validate if a DOM Element is hidden
   */
  public isHidden (): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'query',
      id,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: id
          },
          {
            fact: 'browser',
            path: '$.elements[*].hidden',
            operator: 'containsEvery',
            value: true
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('isHidden')
        }
      },
      selector: this.selector
    });
    return this;
  }

  /**
   * Validate that a DOM Element has className.
   * @param value
   */
  public hasClass (value: string): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'query',
      id,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: id
          },
          {
            fact: 'browser',
            path: '$.elements[*].classNames[*]',
            operator: 'contains',
            value
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('hasClass', value)
        }
      },
      selector: this.selector
    });
    return this;
  }

  /**
   * Validate that a DOM Element has an id set.
   * @param id
   */
  public hasId (id: string): DOMElement {
    const uid = uuid();
    this.addAction({
      type: 'query',
      id: uid,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: uid
          },
          {
            fact: 'browser',
            path: '$.elements[*].id',
            operator: 'containsEvery',
            value: id
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('hasId', id)
        }
      },
      selector: this.selector
    });
    return this;
  }

  /**
   * Validate that a DOM Element is of a certain Element Type, (i.e. `div`, `button`).
   * @param type
   */
  public isTagType (type: string): DOMElement {
    const id = uuid();
    this.addAction({
      type: 'query',
      id,
      conditions: {
        all: [
          {
            fact: 'browser',
            path: '$.id',
            operator: 'equal',
            value: id
          },
          {
            fact: 'browser',
            operator: 'containsEvery',
            path: '$.elements[*].tagName',
            value: type
          }
        ],
        params: {
          id,
          methodName: this.buildMethodName('isTagType', type)
        }
      },
      selector: this.selector
    });
    return this;
  }

  // Utils & Helpers
  // -----

  private buildMethodName (method: string, value?: string | string[]) {
    return DOMElement.buildMethodName(this.selector, method, value);
  }

  private static buildMethodName (selector: string, method: string, value?: string | string[]) {
    let val = '';
    if (_.isString(value)) {
      val = value;
    }
    return `query(${selector}).${method}(${val})`;
  }
}
