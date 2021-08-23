package org.vaadin.addons.componentfactory;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public interface IFieldDescription {
    /**
     * Returns the currently set description of the field, default {@code empty}.
     */
    @NonNull
    String getDescription();

    /**
     * Set the description of the field.
     *
     * Note: Use {@link #setDescriptionAsHtml(String)} when the given description contains html tags.
     */
    void setDescription(@NonNull String description);

    /**
     * Set the description of the field as HTML.
     */
    void setDescriptionAsHtml(@NonNull String description);

    /**
     * Remove the current description of the field.
     */
    void removeDescription();


    /**
     * Returns the currently set {@link FeedbackState} of the field, default {@code null}.
     */
    @Nullable
    FeedbackState getState();

    /**
     * Returns the currently set feedback of the field, default {@code empty}.
     */
    @NonNull
    String getFeedback();

    /**
     * Set the feedback and the {@link FeedbackState} of the field.
     *
     * Note: Use {@link #setFeedbackAsHtml(String, FeedbackState)} when the given feedback contains html tags.
     */
    void setFeedback(@NonNull String feedback, @NonNull FeedbackState state);

    /**
     * Set the feedback and the {@link FeedbackState} of the field as HTML.
     */
    void setFeedbackAsHtml(@NonNull String feedback, @NonNull FeedbackState state);

    /**
     * Remove the current feedback and {@link FeedbackState} of the field.
     */
    void removeFeedback();


    // Default Value: true -- height reserving is activated on the client side
    /**
     * Returns the currently set reverse description height of the field.
     */
    boolean isReserveDescriptionHeight();

    /**
     * Set reserve description height, to protect against jumping fields
     * when the description is added later.
     *
     * The reserved height is determined on the client side.
     *
     * Assumptions:
     *  - the description has only a single line
     *  - the description uses font-size: var(--lumo-font-size-xs)
     *        and line-height: var(--lumo-line-height-xs)
     */
    void setReserveDescriptionHeight(boolean reserveDescriptionHeight);


    // Default Value: false -- no height reserving on client side
    /**
     * Returns the currently set reverse feedback height of the field.
     */
    boolean isReserveFeedbackHeight();

    /**
     * Set reserve feedback height, to protect against jumping fields
     * when the feedback is added later.
     *
     * The reserved height is determined on the client side.
     *
     * Assumptions:
     *  - the feedback has only a single line
     *  - the feedback uses font-size: var(--lumo-font-size-xs)
     *        and line-height: var(--lumo-line-height-xs)
     */
    void setFeedbackHeight(boolean reserveFeedbackHeight);


    // Default Value: false -- tabindex="-1" on client side
    /**
     * Returns if read more button is reachable via keyboard.
     *
     * Note: this is determined by the tabindex of on the button on client side
     *
     * Note: This is false by default to allow for faster tab navigation within forms.
     */
    boolean isReadMoreFocusable();

    /**
     * Allows keyboard focus of read more button.
     *
     * Note: This should be activated for keyboard only users. (Determined by a user setting)
     */
    void setReadMoreFocusable(boolean readMoreFocusable);

    enum FeedbackState {
        SUCCESS, // --field-description-success-color: var(--lumo-success-text-color);
        INFO,  // --field-description-info-color: #2a88c7
        WARN,  // --field-description-warn-color: #c78f2a;
        ERROR // --field-description-error-color: var(--lumo-error-text-color);
    }
}