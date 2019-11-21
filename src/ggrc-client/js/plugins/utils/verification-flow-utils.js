/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import loFind from 'lodash/find';
import loSortBy from 'lodash/sortBy';
import loHead from 'lodash/head';

const VERIFICATION_FLOWS = {
  STANDARD: 'STANDARD',
  SOX_302: 'SOX302',
  MULTI_LEVEL: 'MLV',
};

const isStandardFlow = (instance) => {
  return instance.attr('verification_workflow') === VERIFICATION_FLOWS.STANDARD;
};

const isSox302Flow = (instance) => {
  return instance.attr('verification_workflow') === VERIFICATION_FLOWS.SOX_302;
};

const isMultiLevelFlow = (instance) => {
  return instance.attr('verification_workflow') ===
    VERIFICATION_FLOWS.MULTI_LEVEL;
};

const getFlowDisplayName = (instance) => {
  const flow = loFind(GGRC.assessments_workflows, (flow) =>
    instance.attr('verification_workflow') === flow.value);

  return flow ? flow.display_name : '';
};

const getFirstUnreviewedLevel = (instance) => {
  const unreviewedLevels = instance.attr('review_levels')
    .filter((reviewLevel) => !reviewLevel.verified_by);
  const sortedByLevelNumber = loSortBy(unreviewedLevels, 'level_number');
  const firstUnreviewedLevel = loHead(sortedByLevelNumber);

  return firstUnreviewedLevel;
};

export {
  isStandardFlow,
  isSox302Flow,
  isMultiLevelFlow,
  getFlowDisplayName,
  getFirstUnreviewedLevel,
};
