import * as L from "leaflet";
import { Map, LatLng } from 'leaflet';

declare module 'leaflet' {
  interface mergeOptions extends L.mergeOptions
  {
    almostOver?: boolean;
    almostDistance?: number;
    almostSamplingPeriod?: number;
    almostOnMouseMove?: boolean;
  }

  namespace Handler {
    interface AlmostOver extends L.Handler {
      _map: Map;
      _layers: any[]; // Change 'any[]' to the appropriate type if you have a specific type for your layers.
      _previous: any; // Change 'any' to the appropriate type if you have a specific type for '_previous'.
      _marker: any; // Change 'any' to the appropriate type if you have a specific type for '_marker'.
      _buffer: number;
      __mouseMoveSampling: (e: { latlng: LatLng }) => void;
      initialize(map: Map): void;
	    addHooks(): void;
      removeHooks(): void;
      addLayer(layer: any): void; // Change 'any' to the appropriate type if you have a specific type for 'layer'.
      removeLayer(layer: any): void; // Change 'any' to the appropriate type if you have a specific type for 'layer'.
      getClosest(latlng: LatLng): any; // Change 'any' to the appropriate return type.
      _onMouseMove(e: { latlng: LatLng }): void;
      _onMouseClick(e: { latlng: LatLng, type: string }): void;
    }
  }
  
  if (typeof L.LayerIndexMixin !== 'undefined') {
    Handler.AlmostOver.include(L.LayerIndexMixin);
  }

  Map.addInitHook('addHandler', 'almostOver', Handler.AlmostOver);
}

declare const AlmostOver: typeof L.Handler.AlmostOver;
export default AlmostOver;