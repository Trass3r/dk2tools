meta:
  file-extension: kmf
  id: kmf
  endian: le
  bit-endian: le

doc: Dungeon Keeper 2 Meshes (static and vertex animated)

enums:
  mesh_format:
    1: mesh
    2: anim
    3: group

seq:
- id: magic
  contents: KMSH
- id: size
  type: u4
- id: version
  type: u4
  valid:
    eq: 17
- id: header
  type: kmfheader
- id: materials
  type: matl
- id: mesh
  type: mesh

types:
  kmfheader:
    seq:
    - id: magic
      size: 4
      contents: HEAD
    - id: size
      type: u4
    - id: format
      type: u4
      enum: mesh_format
    - id: uk
      type: u4
      valid:
        eq: 1

  matl:
    seq:
    - id: magic
      contents: MATL
    - id: size
      type: u4
    - id: num_materials
      type: u4
    - id: materials
      type: mat2
      repeat: expr
      repeat-expr: num_materials
    types:
      mat2:
        seq:
        - id: magic
          contents: MAT2
        - id: size
          type: u4
        - id: name
          type: strz
          encoding: ASCII
        - id: num_textures
          type: u4
        - id: textures
          type: strz
          encoding: ASCII
          repeat: expr
          repeat-expr: num_textures
        - id: flags
          type: u4
          enum: material_flags
        - id: brightness # for glowing things like blaze, lava
          type: f4
        - id: shininess # for metals
          type: f4
        - id: envmap
          type: strz
          encoding: ASCII
        enums:
          material_flags:
            1: has_alpha
            2: double_sided
            4: alpha_additive
            8: unknown8 # ice? only set on #TRANS25#icey
            16: unknown10 # only used for 'Angel Bed RibsCreature Bed_Dark Angel2'
            32: unknown20 # never used?
            64: is_shininess_set
            128: is_brightness_set
            256: invisible # Environment mapped, invisible guys have this???

  mesh:
    seq:
    - if: _root.header.format == mesh_format::mesh
      id: magic
      contents: MESH
    - if: _root.header.format == mesh_format::anim
      id: magic_anim
      contents: ANIM
    - id: size
      type: u4
    - id: header
      type: meshheader
    - id: ctrl
      type: ctrl
    - id: model
      type: model
    - if: _root.header.format == mesh_format::anim
      id: itab
      type: itab
    - id: geom
      type: geom
    - if: _root.header.format == mesh_format::anim
      id: vgeo
      type: vgeo

    types:
      meshheader:
        seq:
        - id: magic
          contents: HEAD
        - id: size
          type: u4
        - id: meshname
          type: strz
          encoding: ASCII
        - id: num_groups # mesh groups
          type: u4
        - if: _root.header.format == mesh_format::anim
          id: num_frames # animation frames
          type: u4
        - if: _root.header.format == mesh_format::anim
          id: num_itab_entries
          type: u4
        - id: num_base_vertices # in GEOM, anim worst case = num_frames*num_itab_entries
          type: u4
        - if: _root.header.format == mesh_format::anim
          id: frame_factor_function
          type: u4
          enum: frame_factor_function
        - id: translation
          type: vec3
        - if: _root.header.format == mesh_format::anim
          id: cube_scale
          type: f4
        - id: scale
          type: f4
        - id: num_lods # LOD levels
          type: u4
        enums:
          frame_factor_function:
            0: clamp
            1: wrap

  ctrl:
    seq:
    - id: magic
      contents: CTRL
    - id: size
      type: u4
    - id: num_ctrls # only non-zero in ANIM files
      type: u4
    - id: ctrls
      type: ctrls
      repeat: expr
      repeat-expr: num_ctrls
    types:
      ctrls:
        seq:
          - id: uk1
            type: u2
          - id: uk2
            type: u2
          - id: uk3
            type: u4

  model:
    seq:
    - id: magic
      contents: SPRS
    - id: size
      type: u4
    - id: groups
      type: sphd(_index)
      repeat: expr
      repeat-expr: _parent.header.num_groups
    - id: group_data
      type: sprs(_index)
      repeat: expr
      repeat-expr: _parent.header.num_groups
    types:
      sphd:
        params:
        - id: group_idx
          type: u1
        seq:
        - id: magic
          contents: SPHD
        - id: size
          type: u4
        - id: num_tris_per_level
          type: u4
          repeat: expr
          repeat-expr: _parent._parent.header.num_lods
        - id: num_vertices
          type: u4
        - id: mm_factor # mipmap? somehow LOD-related
          type: f4

      sprs:
        params:
        - id: group_idx
          type: u1
        seq:
        - id: magic
          contents: SPRS
        - id: size
          type: u4
        - id: material_idx
          type: u4
        - id: polygons
          type: poly(group_idx)
        - id: vertices
          type: vert(group_idx)
        types:
          poly:
            params:
            - id: group_idx
              type: u1
            seq:
            - if: _root.header.format == mesh_format::anim
              id: poly_magic
              contents: POLY
            - if: _root.header.format == mesh_format::anim
              id: poly_size
              type: u4
            - id: lod_levels
              type: lod_level(group_idx, _index)
              repeat: expr
              repeat-expr: _parent._parent._parent.header.num_lods
          lod_level:
            params:
            - id: group_idx
              type: u1
            - id: level
              type: u1
            seq:
            - id: triangles
              type: triangle
              repeat: expr
              repeat-expr: _parent._parent._parent.groups[group_idx].num_tris_per_level[level]
          vert:
            params:
            - id: group_idx
              type: u1
            seq:
            - if: _root.header.format == mesh_format::anim
              id: vert_magic
              contents: VERT
            - if: _root.header.format == mesh_format::anim
              id: vert_size
              type: u4
            - id: vertex_data
              type: vertex_data
              repeat: expr
              repeat-expr: _parent._parent.groups[group_idx].num_vertices

  triangle:
    seq:
      - id: x
        type: u1
      - id: y
        type: u1
      - id: z
        type: u1

  vec3:
    seq:
    - id: x
      type: f4
    - id: y
      type: f4
    - id: z
      type: f4

  vertex_data:
    seq:
      - if: _root.header.format == mesh_format::mesh
        id: geom_idx # index of the position data in GEOM
        type: u2
      - id: u
        type: u2
      - id: v
        type: u2
      - id: normal
        type: vec3
      - if: _root.header.format == mesh_format::anim
        id: itab_idx
        type: u2
    instances:
      uv:
        value: '[u / 32768.0, v / 32768.0]'

  itab:
    seq:
      - id: magic
        contents: ITAB
      - id: size
        type: u4
      - id: frame_chunks
        type: frame_chunk
        repeat: expr
        repeat-expr: ((_parent.header.num_frames - 1) / 128 + 1) # per 128 frames
    types:
      frame_chunk:
        seq:
          - id: geom_base
            type: u4
            repeat: expr
            repeat-expr: _parent._parent.header.num_itab_entries

  geom:
    seq:
      - id: magic
        contents: GEOM
      - id: size
        type: u4
      - if: _root.header.format == mesh_format::mesh
        # simple list of vertices
        id: vertices
        type: vec3
        repeat: expr
        repeat-expr: _parent.header.num_base_vertices
      - if: _root.header.format == mesh_format::anim
        # list of "keyframes" (positions) for each vertex, linear interpolation between them
        # "worst case" there is an entry for each frame and the whole system is pointless
        # there is always at least an entry for the first and last frame
        id: vertices_anim
        type: vec3_anim
        repeat: expr
        repeat-expr: _parent.header.num_base_vertices
    types:
      vec3_packed: # something like GL_UNSIGNED_INT_2_10_10_10_REV, https://www.khronos.org/opengl/wiki/Vertex_Specification#D3D_compatibility
        seq:
        - id: z # first byte, lowest bits
          type: b10
        - id: y
          type: b10
        - id: x
          type: b10
        - id: pad # last byte, highest bits
          type: b2
        instances:
          xyz:
            value: '[(x - 512) / 511.0 * _root.mesh.header.scale, (y - 512) / 511.0 * _root.mesh.header.scale, (z - 512) / 511.0 * _root.mesh.header.scale]'
      vec3_anim:
        seq:
        - id: coords
          type: vec3_packed
        - id: frame_base
          type: u1

  vgeo:
    seq:
      - id: magic
        contents: VGEO
      - id: size
        type: u4
      - id: offsets
        type: offset
        repeat: expr
        repeat-expr: _parent.header.num_itab_entries
    types:
      offset:
        seq:
          - id: frame_offsets
            type: u1
            repeat: expr
            repeat-expr: _parent._parent.header.num_frames
