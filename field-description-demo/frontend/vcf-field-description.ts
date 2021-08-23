import { LitElement, html, customElement, property } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


@customElement('vcf-field-description')
export class VcfFieldDescription extends LitElement {
    @property({type: Boolean})
    renderDescriptionAsHtml = false;

    @property({type: String})
    description = "";





    @property({type: Boolean})
    showPercentages = false;

/*
<div class="bar-container">
                ${JSON.parse(this.percentageValues).map( (val :number) =>
                    this.renderBar( Math.round(val*10)/10 )
                )}
              </div>
            </div>
*/

    renderBar(val :number) {
        return html`<div class="bar" style="flex: 0 0 ${val}%">${ this.showPercentages ? val + '%' : unsafeHTML('&nbsp;') }</div>`;
    }

    render() {
        return html`
            <style>
                .field-description-container {
                    display: flex;
                }

                .field-description {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex-grow: 1;
                }

                .expand-icon-container {
                    flex-grow: 0;
                }

                .expand-icon-container iron-icon {
                    height: 15px;
                }
            </style>

            <div class="field-description-container">
                <div class="field-description">
                    ${this.renderDescriptionAsHtml ? unsafeHTML(this.description) : this.description}
                </div>
                <div class="expand-icon-container">
                    <iron-icon aria-hidden="true" tabindex="-1" icon="vaadin:info-circle"></iron-icon>
                </div>
            </div>`;
    }
}