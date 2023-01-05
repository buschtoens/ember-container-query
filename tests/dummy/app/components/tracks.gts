import type { TOC } from '@ember/component/template-only';
/* @ts-ignore-next-line Cannot find module '@ember/helper' or its corresponding type declarations. */
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';
/* @ts-ignore-next-line Cannot find module 'ember-truth-helpers/helpers/and' or its corresponding type declarations. */
import and from 'ember-truth-helpers/helpers/and';
import type { Track } from '../data/album';
import TracksTable from './tracks/table';
import TracksList from './tracks/list';

interface TracksComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

const TracksComponent: TOC<TracksComponentSignature> = <template>
  <ContainerQuery
    @features={{hash
      small=(width max=480)
      medium=(width min=480 max=640)
      large=(width min=640)
      tall=(height min=320)
    }}
    as |CQ|
  >
    {{#if (and CQ.features.large CQ.features.tall)}}
      <TracksTable @tracks={{@tracks}} />

    {{else}}
      <TracksList
        @numColumns={{if
          CQ.features.small
          1
          (if CQ.features.medium 2 3)
        }}
        @tracks={{@tracks}}
      />

    {{/if}}
  </ContainerQuery>
</template>

export default TracksComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof TracksComponent;
  }
}
